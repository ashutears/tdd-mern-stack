import  React  from "react";
import renderer from 'react-test-renderer'
import Enzyme, {shallow} from 'enzyme'
import Adapter  from 'enzyme-adapter-react-16'
import App from '../App'

import mockAxios from '../__mocks__/axios.js'

Enzyme.configure({adapter: new Adapter})

describe('App', () => {

    beforeEach(() => {
        mockAxios.post.mockImplementation(() => Promise.resolve({ data: {} }))
    })

    afterEach(() => {
        mockAxios.post.mockClear()
    })

    it ("should render the App component", () => {
        const component = shallow(<App />)
    })
})