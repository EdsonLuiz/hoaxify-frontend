import React from 'react'
import {render, fireEvent, waitForDomChange} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserSignupPage from './UserSignupPage'


describe('UserSignupPage', () => {
  describe('Layout', () => {
    it('has header of Sign up', () => {
      const {container} = render(<UserSignupPage />)
      const header = container.querySelector('h1')

      expect(header).toHaveTextContent('Sign up')
    })

    it('has input for display name', () => {
      const {queryByPlaceholderText} = render(<UserSignupPage />)
      const displayNameInput = queryByPlaceholderText('Your display name')

      expect(displayNameInput).toBeInTheDocument();
    })

    it('has input for username', () => {
      const {queryByPlaceholderText} = render(<UserSignupPage />)
      const usernameInput = queryByPlaceholderText('Your username')

      expect(usernameInput).toBeInTheDocument();
    })

    it('has input for password', () => {
      const {queryByPlaceholderText} = render(<UserSignupPage />)
      const passwordInput = queryByPlaceholderText('Your password')

      expect(passwordInput).toBeInTheDocument();
    })

    it('has password type for password input', () => {
      const {queryByPlaceholderText} = render(<UserSignupPage />)
      const passwordInput = queryByPlaceholderText('Your password')

      expect(passwordInput.type).toBe('password')
    })

    it('has input for password repeat', () => {
      const {queryByPlaceholderText} = render(<UserSignupPage />)
      const passwordInput = queryByPlaceholderText('Repeat your password')

      expect(passwordInput).toBeInTheDocument();
    })

    it('has input for password repeat', () => {
      const {queryByPlaceholderText} = render(<UserSignupPage />)
      const passwordInput = queryByPlaceholderText('Repeat your password')

      expect(passwordInput.type).toBe('password');
    })

    it('has submit button', () => {
      const {container } = render(<UserSignupPage />)
      const button = container.querySelector('button')

      expect(button).toBeInTheDocument();
    })

    it('has submit button of type submit', () => {
      const {container} = render(<UserSignupPage />)
      const button = container.querySelector('button')

      expect(button.type).toBe('submit')
    })

    it('has submit button with text Sign Up', () => {
      const {container} = render(<UserSignupPage />)
      const button = container.querySelector('button')

      expect(button).toHaveTextContent('Sign Up')
    })

  })

  describe('Interactions', () => {
    const changeEvent = content => {
      return {
        target: {
          value: content
        }
      }
    }

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({})
          }, 3000)
        })
      })
    }

    const mockAsyncDelayedWithError = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject({
              response: {data: {}}
            })
          }, 3000)
        })
      })
    }

    let button, displayNameInput, usernameInput, passwordInput, repeatPasswordInput

    const setupForSubmit = (props) => {
      const rendered = render(<UserSignupPage {...props} />)

      const {container, queryByPlaceholderText} = rendered

      displayNameInput = queryByPlaceholderText('Your display name')
      usernameInput = queryByPlaceholderText('Your username')
      passwordInput = queryByPlaceholderText('Your password')
      repeatPasswordInput = queryByPlaceholderText('Repeat your password')

      fireEvent.change(displayNameInput, changeEvent('my-display-name'))
      fireEvent.change(usernameInput, changeEvent('my-user-name'))
      fireEvent.change(passwordInput, changeEvent('P4ssword'))
      fireEvent.change(repeatPasswordInput, changeEvent('P4ssword'))

      button = container.querySelector('button')

      return rendered
    }

    it('sets the displayName value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />)
      const displayNameInput = queryByPlaceholderText('Your display name')

      fireEvent.change(displayNameInput, changeEvent('my-display-name'))

      expect(displayNameInput).toHaveValue('my-display-name')
    })

    it('sets the username value into state', () => {
      const {queryByPlaceholderText} = render(<UserSignupPage />)
      const usernameInput = queryByPlaceholderText('Your username')

      fireEvent.change(usernameInput, changeEvent('my-username'))
      expect(usernameInput).toHaveValue('my-username')
    })

    it('sets the password value into the state', () => {
      const { queryByPlaceholderText} = render(<UserSignupPage />)
      const passwordInput = queryByPlaceholderText('Your password')

      fireEvent.change(passwordInput, changeEvent('P4ssword'))
      expect(passwordInput).toHaveValue('P4ssword')
    })

    it('sets the repeatPassword value into the state', () => {
      const { queryByPlaceholderText} = render(<UserSignupPage />)
      const repeatPasswordInput = queryByPlaceholderText('Repeat your password')

      fireEvent.change(repeatPasswordInput, changeEvent('P4ssword'))
      expect(repeatPasswordInput).toHaveValue('P4ssword')
    })

    it('calls postSignUp when the fields are valid and the actions are provided in props', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({})
      }

      setupForSubmit({actions})
      fireEvent.click(button)

      expect(actions.postSignup).toHaveBeenCalledTimes(1)

    })

    it('does not throw an exception when clicking the button when actions not provided in props calls postSignUp when the fields are valid and the actions are provided in props', () => {

      setupForSubmit()

      expect(() => fireEvent.click(button)).not.toThrow()


    })

    it('calls post with user body when the fields are valid', () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({})
      }

      setupForSubmit({actions})
      fireEvent.click(button)

      const expectedUserObject = {
        username: 'my-user-name',
        displayName: 'my-display-name',
        password: 'P4ssword',
      }

      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject)

    })

    it('does not allow user to click the Sign Up button when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed()
      }

      setupForSubmit({actions})
      fireEvent.click(button)
      fireEvent.click(button)

      expect(actions.postSignup).toHaveBeenCalledTimes(1)

    })

    it('displays spinner in button when there is an ongoing api call', () => {
      const actions = {
        postSignup: mockAsyncDelayed()
      }

      const {queryByText} = setupForSubmit({actions})
      fireEvent.click(button)

      const spinner = queryByText('Loading...')
      expect(spinner).toBeInTheDocument()
    })

    it('hide spinner in button when api call finishes successfully',async() => {
      const actions = {
        postSignup: mockAsyncDelayed()
      }

      const {queryByText} = setupForSubmit({actions})
      fireEvent.click(button)

      await waitForDomChange()

      const spinner = queryByText('Loading...')
      expect(spinner).not.toBeInTheDocument()
    })

    it('hide spinner in button when api call finishes with error',async() => {
      const actions = {
        postSignup: mockAsyncDelayedWithError()
      }

      const {queryByText} = setupForSubmit({actions})
      fireEvent.click(button)

      await waitForDomChange()

      const spinner = queryByText('Loading...')
      expect(spinner).not.toBeInTheDocument()
    })

  })
})

console.error = () => {}