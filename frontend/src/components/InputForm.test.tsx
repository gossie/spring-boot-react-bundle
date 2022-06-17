import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import InputForm from "./InputForm";
import KanbanGallery from "./KanbanGallery";
import MainPage from "../pages/MainPage";

test("that input is working", async ()=>{
    jest.spyOn(axios, "get").mockImplementation((url: string) => {
        expect(url).toEqual("http://localhost:8080/api/kanban");
        return Promise.resolve({
            results: [
                {
                    id: "1",
                    task: "Aufräumen",
                    description: "Küche",
                    status: "OPEN"
                },
                {
                    id: "2",
                    task: "Staubsaugen",
                    description: "Wohnzimmer",
                    status: "OPEN"
                },
                {
                    id: "3",
                    task: "Einkaufen",
                    description: "Brot",
                    status: "OPEN"
                }
            ]
        })
    });

    render(<MainPage/>)

    await waitFor(()=>{
        expect(screen.getByTestId("task-1")).toBeDefined()
        expect(screen.getByTestId("task-2")).toBeDefined()
        expect(screen.getByTestId("task-3")).toBeDefined()
    })

    }
)