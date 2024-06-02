import { parseMatches } from "./tennisParser";
import { runQuery } from "./tennisQuery";

describe("Querying Tennis Data", () => {
    it("runs simple query match", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        const matches = parseMatches(matchesData);
        const result = runQuery("Score Match 01", matches);


        expect(result.length).toEqual(2);
        expect(result[0]).toEqual("Person A Defeated Person B");
        expect(result[1]).toEqual("2 set to 0");

    });

    it("cannot find match", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        const matches = parseMatches(matchesData);
        const result = runQuery("Score Match 02", matches);


        expect(result.length).toEqual(1);
        expect(result[0]).toEqual("Match not found");

    });

    it("runs simple player total wins query match", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        const matches = parseMatches(matchesData);
        const result = runQuery("Games Player Person A", matches);

        expect(result.length).toEqual(1);
        expect(result[0]).toEqual("12 0");
        

    });

    it("runs simple player total wins query match #2", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "1",
            "1",
            "0",
            "1",
            "1",
            "1",
            "Match: 02",
            "Person B vs Person C",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "Match: 03",
            "Person B vs Person C",
            "1",
            "1",
            "1",
            "1",
            "0",
            "0",
        ];

        const matches = parseMatches(matchesData);
        const result = runQuery("Games Player Person B", matches);

        expect(result.length).toEqual(1);
        expect(result[0]).toEqual("2 1");
        

    });
});