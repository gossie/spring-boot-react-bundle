import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import KanbanBoard from "../Board/KanbanBoard";
import {MemoryRouter} from "react-router-dom";
import InputField from "./InputField";
import {wait} from "@testing-library/user-event/dist/utils";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Status, TaskItem} from "../model";


test("that form is submitted with correct inputs", async () => {

    const errorDummyFunction = jest.fn();
    const changeDummyFunction = jest.fn();

    jest.spyOn(axios, "post").mockImplementation((url: string, data: any) => {
        expect(url).toEqual("/api/kanban");
        expect(data).toEqual({task: "Hello", description: "World", status: Status.OPEN})
        return Promise.resolve({} as AxiosResponse)
    })

    render(<MemoryRouter><InputField errorFunction={errorDummyFunction} onTaskChange={changeDummyFunction}/></MemoryRouter>)

    const taskInput = screen.getByTestId("taskInput")
    const descInput = screen.getByTestId("descInput")
    const submitButton = screen.getByTestId("submit")

    fireEvent.change(taskInput, {target: { value: "Hello"}})
    fireEvent.change(descInput, {target: { value: "World"}})
    fireEvent.submit(submitButton)

    await waitFor(() => {
        expect((taskInput as HTMLInputElement).value).toEqual("");
        expect((descInput as HTMLInputElement).value).toEqual("");
        expect(changeDummyFunction).toHaveBeenCalledTimes(1);
        expect(errorDummyFunction).not.toHaveBeenCalled();
    })

})

test("that form is submitted with correct inputs", async () => {

    const errorDummyFunction = jest.fn();
    const changeDummyFunction = jest.fn();

    jest.spyOn(axios, "post").mockImplementation((url: string, data: any) => {
        expect(url).toEqual("/api/kanban");
        expect(data).toEqual({task: "Hello", description: "World", status: Status.OPEN})
        return Promise.reject({response: {data: "blub"}} as AxiosError)
    })

    render(<MemoryRouter><InputField errorFunction={errorDummyFunction} onTaskChange={changeDummyFunction}/></MemoryRouter>)

    const taskInput = screen.getByTestId("taskInput")
    const descInput = screen.getByTestId("descInput")
    const submitButton = screen.getByTestId("submit")

    fireEvent.change(taskInput, {target: { value: "Hello"}})
    fireEvent.change(descInput, {target: { value: "World"}})
    fireEvent.submit(submitButton)

    await waitFor(() => {
        expect((taskInput as HTMLInputElement).value).toEqual("Hello");
        expect((descInput as HTMLInputElement).value).toEqual("World");
        expect(changeDummyFunction).not.toHaveBeenCalled();
        expect(errorDummyFunction).toHaveBeenCalledTimes(1);
    })

})