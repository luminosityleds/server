import Login from "../components/Login";
import {MemoryRouter as Router} from 'react-router-dom'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockLocalStorage } from '../setupTests';

const { getItemMock, setItemMock } = mockLocalStorage();

// Can be used to describe properties of Login
describe('Login', () => {

    let windowSpy: any = null;

    beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
    });

    afterEach(() => {
    windowSpy.mockRestore();
    });
    const user = userEvent.setup()

    // Test going to the register page
    it('go to register page', () => {
        render(
            <Router>
                <Login username={""} password={""} />
            </Router>
        );
        const register_page = "/register"
        user.click(screen.getByText(/Register/i));
        
        windowSpy.mockImplementation(() => ({
            location: {
              origin: register_page
            }
          }));
        expect(window.location.origin).toEqual(register_page);
    })
    
    // Test a login of a user, note a lot of mocking is done here
    it('login a user', () => {
        render(
            <Router>
                <Login username={""} password={""} />
            </Router>
        );
        const google_url = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?gsiwebsdk=3&client_id=281168454695-kvsbsq9sp4gtap61erk0mhe53bgddgfl.apps.googleusercontent.com&scope=openid%20profile%20email&redirect_uri=storagerelay%3A%2F%2Fhttp%2Flocalhost%3A3000%3Fid%3Dauth506869&prompt=select_account&response_type=token&include_granted_scopes=true&enable_granular_consent=true&service=lso&o2v=2&flowName=GeneralOAuthFlow"
        const homepage = "/"

        user.click(screen.getByText(/Login with Google/i));
        windowSpy.mockImplementation(() => ({
            location: {
              origin: google_url
            }
          }));
        
        expect(window.location.origin).toEqual(google_url);
        windowSpy.mockImplementation(() => ({
            location: {
              origin: homepage
            }
          }));
        expect(window.location.origin).toEqual(homepage);
        
        const mockLoggedIn = "isLoggedIn";
        const mockData = "true";
        setItemMock(mockLoggedIn, mockData)
        expect(setItemMock).toHaveBeenCalledWith(mockLoggedIn, mockData);
    });
});
