import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
  describe('Layout', () => {
    it('has input item', () => {
      const {container} = render(<Input />)
      const input = container.querySelector('input')
      expect(input).toBeInTheDocument()
    })

    it('displays the label provided in props', () => {
      const {queryByText} = render(<Input label="Test label" />)
      const label = queryByText('Test label')
      expect(label).toBeInTheDocument()
    })

    it('does not displays the label when not provided in props', () => {
      const {container} = render(<Input />)
      const label = container.querySelector('label')
      expect(label).not.toBeInTheDocument()
    })

    it('has text type for input when type is not provided as props', () => {
      const {container} = render(<Input />)
      const input = container.querySelector('input')
      expect(input.type).toBe('text')
    })

    it('has password type for input when password type is provided as props', () => {
      const {container} = render(<Input type='password' />)
      const input = container.querySelector('input')
      expect(input.type).toBe('password')
    })

    it('displays placeholder when it is provided as props', () => {
      const {container} = render(<Input placeholder='test placeholder' />)
      const input = container.querySelector('input')
      expect(input.placeholder).toBe('test placeholder')
    })

    it('displays value when it is provided as props', () => {
      const {container} = render(<Input value='test value' />)
      const input = container.querySelector('input')
      expect(input.value).toBe('test value')
    })

    it('has onChange callback when it is provided as props', () => {
      const onChange = jest.fn()
      const {container} = render(<Input onChange={onChange} />)
      const input = container.querySelector('input')
      fireEvent.change(input, {target: {value: 'new-input'}})
      expect(onChange).toBeCalledTimes(1)
    })

    it('has default style when there no validation errors or success', () => {
      const {container} = render(<Input />)
      const input = container.querySelector('input')
      expect(input.className).toBe('form-control')
    })

    it('has success style when hasError property is false', () => {
      const {container} = render(<Input hasError={false} />)
      const input = container.querySelector('input')
      expect(input.className).toBe('form-control is-valid')
    })

    it('has error style when hasError property is true', () => {
      const {container} = render(<Input hasError={true} />)
      const input = container.querySelector('input')
      expect(input.className).toBe('form-control is-invalid')
    })

    it('display the error text when  it is provided', () => {
      const {queryByText} = render(<Input hasError={true} error="Can not be null" />)
      expect(queryByText('Can not be null')).toBeInTheDocument()
    })

    it('does not display the error text when hasError is not provided', () => {
      const {queryByText} = render(<Input error="Can not be null" />)
      expect(queryByText('Can not be null')).not.toBeInTheDocument()
    })

  })

  describe('Interactions', () => {})
})
