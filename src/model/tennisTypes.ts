export interface Point {
    personAScore: number;
    personBScore: number;
    advantageA: boolean;
    advantageB: boolean;
};

export interface Game {
    pointHistory: Point[];
    winner: number;
};

export interface GameSet {
    games: Game[];
    playerAGamesWon: number;
    playerBGamesWon: number;
    complete: boolean;
};

export interface Match {
    id: string;
    personA?: string;
    personB?: string;
    sets: GameSet[];
};