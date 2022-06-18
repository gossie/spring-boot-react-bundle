
import {render, waitFor} from "@testing-library/react";
import axios from "axios";
import EditItem from "./EditItem";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    useParams: ()=>({id: "2"}),
    useNavigate: ()=>mockUseNavigate
}))

test('Edit item mocked', async ()=>{

    jest.spyOn(axios, 'get').mockImplementationOnce((url) => {
        expect(url).toEqual('/2');
        return Promise.reject({status: 404});
    })

    render(<EditItem />)

    await waitFor(()=>{
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    })
})