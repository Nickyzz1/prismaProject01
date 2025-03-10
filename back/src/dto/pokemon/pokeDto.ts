export interface getPoke {
    name : string,
}
export interface IPokemon {
    id: number;
    name: string;
    base_experience: number;
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    sprites: {
        front_default: string;
        front_shiny: string;
        back_default?: string;
        back_shiny?: string;
        other?: {
            "official-artwork"?: {
                front_default: string;
                front_shiny?: string;
            };
        };
    };
    species: {
        name: string;
    };
}

