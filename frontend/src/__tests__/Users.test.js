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

    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('ADMIN')).toBeInTheDocument();

    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('USER')).toBeInTheDocument();
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

    await screen.findByText('Bob');

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[1]); // Bob's delete button

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

    await screen.findByText('Alice');

    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    fireEvent.click(deleteButtons[0]); // Alice's delete button

    expect(axios.delete).not.toHaveBeenCalled();
  });
});
