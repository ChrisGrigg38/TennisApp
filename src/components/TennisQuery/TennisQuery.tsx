import React, { useEffect, useState } from 'react';
import { parseMatches } from "../../logic/tennisParser";
import { runQuery } from "../../logic/tennisQuery";
import { Match } from '../../model/tennisTypes';
import './TennisQuery.css';

const TennisQuery = () => {
    const [tournamentData, setTournamentData] = useState<string>();
    const [queryData, setQueryData] = useState<string>();
    const [results, setResults] = useState<string[]>([]);

    useEffect(() => {
        setTournamentData("Match: 01\nPerson A vs Person B\n0\n1\n0\n1\n0\n0\n0\n0\n0\n0");
        setQueryData("Games Player Person A");
    }, []);

    const processQuery = () => {
        let tournamentDataSplit = tournamentData?.split("\n") || [];

        try {
            if(queryData) {
                let matches: Match[] = parseMatches(tournamentDataSplit);
                let results = runQuery(queryData, matches);
                setResults(results);
            }
        } catch (e) {
            setResults([(e as Error).message]);
        }
    }

    return (
        <div className="appFrame">
           <div className="formRow">
               <p>Enter Tournament Data Below</p>
               <div>
                   <textarea data-testid="tournamentData" className="tournamentDataArea" value={tournamentData} onChange={(e) => setTournamentData(e.target.value)} />
               </div>
            </div>
           <div className="formRow">
               <p>Enter Query</p>
               <div>
                   <input data-testid="dataQuery" className="queryDataArea" type="text" value={queryData} onChange={(e) => setQueryData(e.target.value)} />
               </div>
            </div>
            <div className="formRow">
               <button data-testid="processButton" onClick={() => processQuery()}>Process Query</button>
            </div>
            <div className="formRow"><hr /></div>
            <div className="formRow">
                <div className="queryBackground">
                    {results.map((x, index) => (<div key={index} data-testid="resultsData">{x}</div>))}
                </div>   
            </div>
        </div>
      );
};

export default TennisQuery;