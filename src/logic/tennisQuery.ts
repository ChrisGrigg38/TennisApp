import { Match } from "../model/tennisTypes";

export const runQuery = (query: string, matches: Match[]): string[] => {
    if(query.startsWith("Score Match") && query.length > 12) {
        return runQueryScoreMatch(query, matches);
    }
    else if(query.startsWith("Games Player") && query.length > 13) {
        return runGamesTotalPlayer(query, matches);
    }

    return ["Invalid Query"];
}

export const runQueryScoreMatch = (query: string, matches: Match[]): string[] => {
    let matchId = query.substring(12);
    let playerAScore = 0;
    let playerBScore = 0;
    let playerAName = "";
    let playerBName = "";
    let foundMatch = false;
    
    matches.forEach((match) => {
        if(match.id === matchId) {
            foundMatch = true;
            playerAName = match.personA || "";
            playerBName = match.personB || "";

            match.sets.forEach((set) => {
                if(set.complete && set.playerAGamesWon > set.playerBGamesWon) {
                    playerAScore++;
                }
                if(set.complete && set.playerBGamesWon > set.playerAGamesWon) {
                    playerBScore++;
                }
            });
        }
    });

    if(!foundMatch) {
        return ["Match not found"];
    }
    else if(playerAScore > playerBScore) {
        return [playerAName + " Defeated " + playerBName, playerAScore + " set to " + playerBScore];
    }
    else if(playerAScore < playerBScore) {
        return [playerBName + " Defeated " + playerAName, playerBScore + " set to " + playerAScore];
    }
    else {
        return [playerBName + " Tied " + playerAName, playerBScore + " set to " + playerAScore];
    }
};

export const runGamesTotalPlayer = (query: string, matches: Match[]): string[] => {
    let player = query.substring(13);
    let wonScore = 0;
    let lostScore = 0;
    
    matches.forEach((match) => {
        if(match.personA === player || match.personB === player) {
            match.sets.forEach((set) => {
                if(match.personA === player) {
                    wonScore += set.playerAGamesWon;
                    lostScore += set.playerBGamesWon;
                }
                if(match.personB === player) {
                    wonScore += set.playerBGamesWon;
                    lostScore += set.playerAGamesWon;
                }
            });
        }
    });

    return [wonScore + " " + lostScore];
};