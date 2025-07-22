import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Users from '../pages/Users';
import API from '../services/api';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/api');

describe('Users Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows users loaded from API', async () => {
    API.get.mockResolvedValueOnce({
      data: [
        { id: 1, username: 'Alice', email: 'alice@example.com', roles: ['ADMIN'] },
        { id: 2, username: 'Bob', email: 'bob@example.com', roles: ['USER'] }
      ]
    });

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('ADMIN')).toBeInTheDocument();

      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
      expect(screen.getByText('USER')).toBeInTheDocument();
    });
  });

  test('deletes a user when confirmed', async () => {
    API.get.mockResolvedValueOnce({
      data: [
        { id: 1, username: 'Alice', email: 'alice@example.com', roles: ['ADMIN'] }
      ]
    });

    API.delete.mockResolvedValueOnce({});

    window.confirm = jest.fn(() => true);

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(API.delete).toHaveBeenCalledWith('/users/1'));

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });

  test('does NOT delete a user when cancel is pressed', async () => {
    API.get.mockResolvedValueOnce({
      data: [
        { id: 1, username: 'Alice', email: 'alice@example.com', roles: ['ADMIN'] }
      ]
    });

    window.confirm = jest.fn(() => false);

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(API.delete).not.toHaveBeenCalled();

    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
