import { parseMatches } from "./tennisParser";

describe("Parsing Tennis App", () => {
    it("parses basic single match", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        const matches = parseMatches(matchesData);

        expect(matches.length).toEqual(1);
        expect(matches[0].id).toEqual("01");
        expect(matches[0].personA).toEqual("Person A");
        expect(matches[0].personB).toEqual("Person B");
        expect(matches[0].sets.length).toEqual(1);
        expect(matches[0].sets[0].games.length).toEqual(2);
        expect(matches[0].sets[0].games[0].winner).toEqual(0);
        expect(matches[0].sets[0].games[1].winner).toEqual(0);
        expect(matches[0].sets[0].games[0].pointHistory.length).toEqual(6);
        expect(matches[0].sets[0].games[1].pointHistory.length).toEqual(4);
        expect(matches[0].sets[0].games[0].pointHistory[0].personAScore).toEqual(15);
        expect(matches[0].sets[0].games[0].pointHistory[0].personBScore).toEqual(0);
        expect(matches[0].sets[0].games[0].pointHistory[1].personAScore).toEqual(15);
        expect(matches[0].sets[0].games[0].pointHistory[1].personBScore).toEqual(15);
        expect(matches[0].sets[0].games[0].pointHistory[2].personAScore).toEqual(30);
        expect(matches[0].sets[0].games[0].pointHistory[2].personBScore).toEqual(15);
        expect(matches[0].sets[0].games[0].pointHistory[3].personAScore).toEqual(30);
        expect(matches[0].sets[0].games[0].pointHistory[3].personBScore).toEqual(30);
        expect(matches[0].sets[0].games[0].pointHistory[4].personAScore).toEqual(40);
        expect(matches[0].sets[0].games[0].pointHistory[4].personBScore).toEqual(30);
        expect(matches[0].sets[0].games[0].pointHistory[5].advantageA).toEqual(true);
        expect(matches[0].sets[0].games[0].pointHistory[5].personBScore).toEqual(30);
        expect(matches[0].sets[0].games[1].pointHistory[0].personAScore).toEqual(15);
        expect(matches[0].sets[0].games[1].pointHistory[0].personBScore).toEqual(0);
        expect(matches[0].sets[0].games[1].pointHistory[1].personAScore).toEqual(30);
        expect(matches[0].sets[0].games[1].pointHistory[1].personBScore).toEqual(0);
        expect(matches[0].sets[0].games[1].pointHistory[2].personAScore).toEqual(40);
        expect(matches[0].sets[0].games[1].pointHistory[2].personBScore).toEqual(0);
        expect(matches[0].sets[0].games[1].pointHistory[3].advantageA).toEqual(true);
    });

    it("parses several matches", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "Match: 02",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "Match: 03",
            "Person B vs Person C",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "Match: 04",
            "Person C vs Person A",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        const matches = parseMatches(matchesData);

        expect(matches.length).toEqual(4);
        expect(matches[0].id).toEqual("01");
        expect(matches[0].personA).toEqual("Person A");
        expect(matches[0].personB).toEqual("Person B");
        expect(matches[1].id).toEqual("02");
        expect(matches[1].personA).toEqual("Person A");
        expect(matches[1].personB).toEqual("Person B");
        expect(matches[2].id).toEqual("03");
        expect(matches[2].personA).toEqual("Person B");
        expect(matches[2].personB).toEqual("Person C");
        expect(matches[3].id).toEqual("04");
        expect(matches[3].personA).toEqual("Person C");
        expect(matches[3].personB).toEqual("Person A");
        
    });

    it("fails to parse duplicate matches", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "Match: 01",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        try {
            const matches = parseMatches(matchesData);
            fail("Should not be able to parse");
        } catch (e) {
            expect((e as Error).message).toEqual("Duplicate Match Found: 01");
        }     
    });

    it("fails to parse invalid input", () => {
        const matchesData = [
            "blabla",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        try {
            const matches = parseMatches(matchesData);
            fail("Should not be able to parse");
        } catch (e) {
            expect((e as Error).message).toEqual("Invalid Format at line: 0");
        }     
    });

    it("fails to parse invalid input #2", () => {
        const matchesData = [
            "Match: 01",
            "Person A vbblabla",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        try {
            const matches = parseMatches(matchesData);
            fail("Should not be able to parse");
        } catch (e) {
            expect((e as Error).message).toEqual("Invalid Format at line: 1");
        }     
    });

    it("fails to parse invalid input #3", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "a",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        try {
            const matches = parseMatches(matchesData);
            fail("Should not be able to parse");
        } catch (e) {
            expect((e as Error).message).toEqual("Invalid Format at line: 2");
        }     
    });

    it("fails to parse invalid input #4", () => {
        const matchesData = [] as string[];

        const matches = parseMatches(matchesData);    
        expect(matches.length).toEqual(0);
        
    });

    it("fails to parse invalid input #5", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "aaaaaa",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        try {
            const matches = parseMatches(matchesData);
            fail("Should not be able to parse");
        } catch (e) {
            expect((e as Error).message).toEqual("Invalid Format at line: 12");
        }     
    });

    it("fails to parse invalid input #6", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0",
            "Match: 02",
            "Person A vs Person B",
            "3",
            "1",
            "0",
            "1",
            "0",
            "0",
            "0",
            "0",
            "0",
            "0"
        ];

        try {
            const matches = parseMatches(matchesData);
            fail("Should not be able to parse");
        } catch (e) {
            expect((e as Error).message).toEqual("Invalid Format at line: 14");
        }     
    });

    it("parses with spaces in input", () => {
        const matchesData = [
            "Match: 01",
            "Person A vs Person B",
            "0",
            "1",
            "0",
            "1",
            "",
            "0",
            "0",
            "0",
            "0",
            "0",
        ];

       const matches = parseMatches(matchesData);
       expect(matches.length).toEqual(1);     
    });
});