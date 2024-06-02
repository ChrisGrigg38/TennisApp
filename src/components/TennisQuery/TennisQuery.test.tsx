import React from 'react';
import { fireEvent, getByTestId, render, screen, waitFor } from '@testing-library/react';
import TennisQuery from './TennisQuery';
import { act } from 'react-dom/test-utils';

test('renders default UI', async () => {
    render(<TennisQuery />);
    const tournamentData = screen.getAllByTestId("tournamentData");
    const dataQueryElement = screen.getAllByTestId("dataQuery");
    expect(dataQueryElement[0]).toBeInTheDocument();
    expect(tournamentData[0]).toBeInTheDocument();
});

test('renders simple query', async () => {
    render(<TennisQuery />);
    const tournamentData = screen.getAllByTestId("tournamentData");
    const dataQueryElement = screen.getAllByTestId("dataQuery");
    fireEvent.change(tournamentData[0], {target: {value: "Match: 01\nPerson A vs Person B\n0\n0\n0\n0\n0\n0\n0\n0\n0"}});
    fireEvent.change(dataQueryElement[0], {target: {value: "Games Player Person B"}});
    const processButton = await screen.findByTestId("processButton");

    act(() => {
        processButton.click();
    });
    
    await waitFor(() => {
        expect(screen.getByTestId('resultsData')).toBeInTheDocument()
    });

    const results = await screen.findAllByTestId('resultsData');
    expect(results.length).toEqual(1);
    expect(results[0].innerHTML).toEqual("0 2");

});

test('renders simple query #2', async () => {
    render(<TennisQuery />);
    const tournamentData = screen.getAllByTestId("tournamentData");
    const dataQueryElement = screen.getAllByTestId("dataQuery");
    fireEvent.change(tournamentData[0], {target: {value: "Match: 01\nPerson A vs Person B\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0\n0"}});
    fireEvent.change(dataQueryElement[0], {target: {value: "Score Match 01"}});
    const processButton = await screen.findByTestId("processButton");

    act(() => {
        processButton.click();
    });
    
    await waitFor(() => {
        expect(screen.findAllByTestId('resultsData')).not.toBeNull();
    });

    const results = await screen.findAllByTestId('resultsData');
    expect(results.length).toEqual(2);
    expect(results[0].innerHTML).toEqual("Person A Defeated Person B");
    expect(results[1].innerHTML).toEqual("2 set to 0");

});