import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Users from '../pages/Users';
import axios from 'axios';

jest.mock('axios');

describe('Users Component', () => {
  const mockUsers = [
    {
      id: 1,
      username: 'Alice',
      email: 'alice@example.com',
      roles: ['ADMIN']
    },
    {
      id: 2,
      username: 'Bob',
      email: 'bob@example.com',
      roles: ['USER']
    }
  ];

  let originalWarn;
  beforeAll(() => {
    originalWarn = console.warn;
    jest.spyOn(console, 'warn').mockImplementation((msg, ...args) => {
      if (
        typeof msg === 'string' &&
        msg.includes('React Router Future Flag Warning')
      ) {
        return; 
      }
      originalWarn(msg, ...args);
    });
  });

  afterAll(() => {
    console.warn.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows users loaded from API', async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
      expect(screen.getByDisplayValue('alice@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('ADMIN')).toBeInTheDocument();

      expect(screen.getByDisplayValue('Bob')).toBeInTheDocument();
      expect(screen.getByDisplayValue('bob@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('USER')).toBeInTheDocument();
    });
  });

  test('deletes a user when confirmed', async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });
    axios.delete.mockResolvedValueOnce({ status: 200 });

    window.confirm = jest.fn(() => true);

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Bob')).toBeInTheDocument();
    });

   
    const deleteButtons = screen.getAllByRole('button', { name: /❌ Delete/i });
    const deleteBobButton = deleteButtons[1]; // second user (Bob)
    fireEvent.click(deleteBobButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('/users/2');
    });
  });

  test('does NOT delete a user when cancel is pressed', async () => {
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    window.confirm = jest.fn(() => false);

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Bob')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole('button', { name: /❌ Delete/i });
    const deleteAliceButton = deleteButtons[0];
    fireEvent.click(deleteAliceButton);


    expect(axios.delete).not.toHaveBeenCalled();
  });
});
