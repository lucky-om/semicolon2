import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Wildcard {
  id: number;
  card_number: number;
  name: string;
  description: string | null;
}

export const useWildcards = () => {
  return useQuery({
    queryKey: ["wildcards"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wildcards")
        .select("*")
        .order("card_number", { ascending: true });

      if (error) throw error;
      return data as Wildcard[];
    },
  });
};
