import axios from "axios";
import {Status, TaskItem} from "../model";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import App from "../App";
import KanbanBoard from "./KanbanBoard";



test("that server connection established and items rendered properly", async () => {

    const task1: TaskItem = {
        id: "01",
        task: "Hallo",
        description: "Task",
        status: Status.OPEN
    }

    const task2: TaskItem = {
        id: "02",
        task: "Hallo2",
        description: "Task2",
        status: Status.OPEN
    }

    jest.spyOn(axios, "get").mockImplementation((url: string) => {
        expect(url).toEqual("http://localhost:8080/api/kanban")
        return Promise.resolve({
            status: 200,
            data: [task1, task2]
        })
    })

    render(<App/>)

    await waitFor(() => {
        expect(screen.getByTestId("01")).toBeDefined();
        expect(screen.getByTestId("02")).toBeDefined();
    })
})