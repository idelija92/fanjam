import { render, screen, waitFor } from '@testing-library/react';
import Events from '../pages/Events';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';

jest.mock('../services/api');

describe('Events Component', () => {
    const mockAuth = {
        currentUser: { email: 'test@fanjam.com' }
    };

    test('shows "No events yet!" when API returns empty', async () => {
        API.get.mockResolvedValueOnce({ data: [] });

        render(
            <AuthContext.Provider value={mockAuth}>
                <Events />
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/No events yet!/i)).toBeInTheDocument();
        });
    });

    test('displays events loaded from API', async () => {
        API.get.mockResolvedValueOnce({
            data: [
                { id: 1, title: 'Rock Night', rsvps: [] },
                { id: 2, title: 'Jazz Evening', rsvps: [] }
            ]
        });

        render(
            <AuthContext.Provider value={mockAuth}>
                <Events />
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Rock Night')).toBeInTheDocument();
            expect(screen.getByText('Jazz Evening')).toBeInTheDocument();
        });
    });
});
