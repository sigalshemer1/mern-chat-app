import { render, screen, waitFor } from '@testing-library/react';
import MessageRoom from './MessageRoom';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import { vi } from 'vitest';

// Mock the useAuthContext hook
vi.mock('../../context/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

// Mock the extractTime utility
vi.mock('../../utils/extractTime', () => ({
  extractTime: vi.fn(),
}));

describe('MessageRoom Component', () => {
  const mockAuthUser = {
    _id: '123',
    profilePic: 'authUserPic.jpg',
  };

  const mockMessageNew = {
    messageRoom: {
      sender: { profilePic: 'senderPic.jpg' },
      newMessageRoom: 'Hello, this is a new message!',
      senderId: '123', // AuthUser's ID, meaning it's from me
      createdAt: '2023-09-25T12:00:00Z',
    },
  };

  const mockMessageExisting = {
    senderId: { _id: '456', profilePic: 'senderPic.jpg' }, // A different user's ID
    createdAt: '2023-09-25T12:00:00Z',
    messageRoom: 'Hello, this is an existing message!',
  };

  beforeEach(() => {
    useAuthContext.mockReturnValue({ authUser: mockAuthUser });
    extractTime.mockReturnValue('12:00 PM');
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks between tests
  });

  it('shows loading indicator when isNew is null', () => {
    render(<MessageRoom message={{}} />); // Passing an empty message object to simulate loading
    expect(screen.getByText('Loading message...')).toBeInTheDocument();
  });

  it('renders a new message correctly (from the auth user)', async () => {
    render(<MessageRoom message={mockMessageNew} />);

    // Wait for the component to finish setting isNew to true
    await waitFor(() => {
      expect(screen.getByText('Hello, this is a new message!')).toBeInTheDocument();
    });

    // Check that the correct profile picture is displayed (from the auth user)
    const profileImg = screen.getByAltText('Tailwind CSS chat bubble component');
    expect(profileImg).toHaveAttribute('src', 'authUserPic.jpg');

    // Check if the formatted time is displayed
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });

  it('renders an existing message correctly (from another user)', async () => {
    render(<MessageRoom message={mockMessageExisting} />);

    // Wait for the component to finish setting isNew to false
    await waitFor(() => {
      expect(screen.getByText('Hello, this is an existing message!')).toBeInTheDocument();
    });

    // Check that the correct profile picture is displayed (from the sender)
    const profileImg = screen.getByAltText('Tailwind CSS chat bubble component');
    expect(profileImg).toHaveAttribute('src', 'senderPic.jpg');

    // Check if the formatted time is displayed
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });

  it('returns null if theSender or theSenderId is missing', () => {
    render(<MessageRoom message={{}} />); // Pass an invalid message object
    expect(screen.queryByText('Loading message...')).not.toBeInTheDocument(); // No loading, should return null
  });
});
