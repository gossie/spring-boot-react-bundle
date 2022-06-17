import {Task} from "../service/model";
import {render, screen, waitFor} from "@testing-library/react";
import {fetchAllTasks} from "../service/apiServices";
import KanbanCard from "./KanbanCard";
import {MemoryRouter} from "react-router-dom";
import axios from "axios";

test("that task is rendered", ()=>{


    const dummyCallBack = jest.fn(()=>{

    })

    //Given

    const task: Task ={
        id: "1",
        task: "Saugen",
        description: "Wohnzimmer",
        status: "OPEN"
    }

    //When
    render(<MemoryRouter><KanbanCard task={task} onTaskManipulation={dummyCallBack}/></MemoryRouter>)

    //Then
    expect(screen.getByTestId("task").textContent).toEqual("Saugen")
    expect(screen.getByTestId("description").textContent).toEqual("Wohnzimmer")
    expect(dummyCallBack).not.toHaveBeenCalled()
})
