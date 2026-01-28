-- Create wildcards table to store the card options
CREATE TABLE public.wildcards (
    id SERIAL PRIMARY KEY,
    card_number INTEGER NOT NULL UNIQUE CHECK (card_number >= 1 AND card_number <= 3),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS (public read access since this is game configuration)
ALTER TABLE public.wildcards ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read wildcards (it's public game data)
CREATE POLICY "Wildcards are publicly readable" 
ON public.wildcards 
FOR SELECT 
USING (true);

-- Insert the three wildcard options
INSERT INTO public.wildcards (card_number, name, description) VALUES
(1, 'Skip', 'Skip this challenge'),
(2, 'Freeze', 'Freeze your opponent'),
(3, 'Guess the Points', 'Guess and win bonus points');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_wildcards_updated_at
BEFORE UPDATE ON public.wildcards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();