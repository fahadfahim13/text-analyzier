// src/__tests__/TextView.test.tsx
import React from 'react';
import { 
  useGetDetailsTextMutation, 
  useUpdateTextMutation 
} from '@/lib/redux/APIs/resume';
import { toast } from '@/components/ui/use-toast';
import TextView from '@/app/Text/[textId]/page';
import Provider from "@/app/components/Provider";
import ReduxProvider from "@/app/components/ReduxProvider";
import { render, screen, fireEvent, waitFor } from '../test-utils'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

// Mock the hooks
jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('@/components/ui/use-toast');
jest.mock('@/lib/redux/APIs/resume');

// Mock NextAuth SessionProvider
jest.mock('@/app/components/Provider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Redux Provider
jest.mock('@/app/components/ReduxProvider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));


const mockTextData = {
  title: 'Test Title',
  content: 'Test Content',
  analysis: {
    characterCount: 100,
    paragraphCount: 2,
    wordCount: 20,
    sentenceCount: 5,
    longestWords: ['elephant', 'giraffe', 'hippopotamus']
  }
};

describe('TextView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useParams as jest.Mock).mockReturnValue({
      textId: '123'
    });
  });

  it('renders the component with initial data', async () => {
    render(<TextView />);
    expect(screen.getByText('Text Analysis')).toBeInTheDocument();
  });

  it('renders the component with initial data', async () => {
    render(<TextView />);

    // Check if title and main elements are rendered
    expect(screen.getByText('Text Analysis')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('loads and displays text data correctly', async () => {
    render(<TextView />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument(); // Character count
      expect(screen.getByText('20')).toBeInTheDocument(); // Word count
    });
  });

  it('displays analysis statistics correctly', async () => {
    render(<TextView />);

    await waitFor(() => {
      expect(screen.getByText('Total Characters')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('Total Words')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
      expect(screen.getByText('Total Sentences')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });
  });

  it('displays longest words correctly', async () => {
    render(<TextView />);

    await waitFor(() => {
      mockTextData.analysis.longestWords.forEach(word => {
        expect(screen.getByText(word)).toBeInTheDocument();
      });
    });
  });

  it('handles text update correctly', async () => {
    const mockUpdateText = jest.fn();
    (useUpdateTextMutation as jest.Mock).mockReturnValue([
      mockUpdateText,
      {
        data: { success: true },
        isSuccess: true,
        isError: false,
        isLoading: false
      }
    ]);

    render(<TextView />);

    // Simulate title change
    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    // Simulate content change
    const contentTextarea = screen.getByPlaceholderText('Give your text to analyze..');
    fireEvent.change(contentTextarea, { target: { value: 'New Content' } });

    // Click update button
    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockUpdateText).toHaveBeenCalledWith({
        id: '123',
        title: 'New Title',
        content: 'New Content',
        userEmail: 'test@example.com'
      });
    });
  });

  it('shows error toast when update fails', async () => {
    (useUpdateTextMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isSuccess: false,
        isError: true,
        isLoading: false
      }
    ]);

    render(<TextView />);

    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Couldn't Update Resume",
          variant: "destructive"
        })
      );
    });
  });

  it('shows success toast when update succeeds', async () => {
    (useUpdateTextMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: { success: true },
        isSuccess: true,
        isError: false,
        isLoading: false
      }
    ]);

    render(<TextView />);

    const updateButton = screen.getByText('Update');
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Successfully Updated Text",
          style: {
            backgroundColor: "green",
            color: "white",
          }
        })
      );
    });
  });

  it('handles loading state correctly', async () => {
    (useGetDetailsTextMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      {
        data: null,
        isSuccess: false,
        isError: false,
        isLoading: true
      }
    ]);

    render(<TextView />);
    
    // You might want to add loading indicators to your component
    // and test for their presence here
  });
});