
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import {Todo} from "../model";
import EditItem from "../components/EditItem";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useParams: ()=>({id: "1"}),
    useNavigate: ()=>mockUseNavigate
}))

test('Edit item mocked', async ()=>{
    const task1: Todo = {description: "desc1", id: "1", status: "OPEN", task: "task1"};
    const task1edited: Todo = {description: "desc1edited", id: "1", status: "OPEN", task: "task1edited"};

    jest.spyOn(axios, 'get').mockImplementationOnce((url) => {
        expect(url).toEqual('/' + task1.id);
        return Promise.resolve({status: 200, data: task1});
    }).mockImplementationOnce((url) => {
        expect(url).toEqual('/' + task1.id);
        return Promise.resolve({status: 200, data: task1edited});
    })

    jest.spyOn(axios, 'put').mockImplementationOnce((url: string) => {
        expect(url).toEqual('');
        return Promise.reject({response: {status: 400}});
    }).mockImplementationOnce((url: string) => {
        expect(url).toEqual('');
        return Promise.resolve({status: 200, data: task1});
    })

    render(<EditItem />)

    await waitFor(()=>{
        expect(mockUseNavigate).not.toHaveBeenCalled();
        expect(screen.getByTestId("edititem")).toHaveTextContent("Edit task")
        expect(screen.getByTestId("edititem")).toHaveTextContent("Description")
    })

    const edit_task_input = screen.getByTestId('taskinput').children[0];
    fireEvent.change(edit_task_input, { target: { value: '' }});
    fireEvent.click(screen.getByTestId('editformsubmit'))

    await waitFor(()=> {
        expect(screen.getByTestId("edititem")).toHaveTextContent("Make sure your input is correct (task cannot be empty).")
    })


    fireEvent.change(screen.getByTestId('taskinput').children[0], { target: { value: 'task1edited' }});
    fireEvent.click(screen.getByTestId('editformsubmit'))

    await waitFor(()=> {
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    })
})