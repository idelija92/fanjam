import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import EventVotingPage from "../pages/EventVotingPage";
import { AuthContext } from "../context/AuthContext";
import { getVotesForEvent, voteForSong, unvoteForSong } from "../api/songVotes";
import API from "../services/api";

jest.mock("../api/songVotes");
jest.mock("../services/api");

const mockToken = "mock-token";

const mockEvent = {
  title: "Rock Festival",
  date: "2025-07-30",
  venue: "City Arena",
  bands: [
    { name: "The Rockers", setlist: ["Song A", "Song B"] },
    { name: "Jazz Masters", setlist: ["Song C"] }
  ]
};

const mockVotes = [
  { songTitle: "Song A", customMessage: "Love this!" },
  { songTitle: "Song B", customMessage: "" },
  { songTitle: "Song A", customMessage: "" }
];

describe("EventVotingPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getVotesForEvent.mockResolvedValueOnce({ data: mockVotes });
    API.get.mockResolvedValueOnce({ data: mockEvent });
  });

  const renderWithRouterAndAuth = () => {
    return render(
      <AuthContext.Provider value={{ token: mockToken }}>
        <MemoryRouter initialEntries={["/events/1/vote"]}>
          <Routes>
            <Route path="/events/:eventId/vote" element={<EventVotingPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it("shows loading spinner initially", async () => {
    renderWithRouterAndAuth();
    expect(screen.getByText(/loading event/i)).toBeInTheDocument();
    await screen.findByText("Rock Festival");
  });

  it("fetches and displays event info & votes", async () => {
    renderWithRouterAndAuth();
    expect(await screen.findByText("Rock Festival")).toBeInTheDocument();
    expect(screen.getByText("Song A")).toBeInTheDocument();
    expect(screen.getByText("Song B")).toBeInTheDocument();
  });

  it("allows selecting a setlist song and voting", async () => {
    renderWithRouterAndAuth();
    await screen.findByText("Rock Festival");
    const songSelect = screen.getByLabelText(/choose a song/i);
    fireEvent.change(songSelect, { target: { value: "Song A" } });
    voteForSong.mockResolvedValueOnce({});
    const submitBtn = screen.getByRole("button", { name: /submit vote/i });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(voteForSong).toHaveBeenCalledWith("1", "Song A", mockToken, "");
    });
  });

  it("alerts when trying to vote with no song selected", async () => {
    renderWithRouterAndAuth();
    await screen.findByText("Rock Festival");
    window.alert = jest.fn();
    const submitBtn = screen.getByRole("button", { name: /submit vote/i });
    fireEvent.click(submitBtn);
    expect(window.alert).toHaveBeenCalledWith("Please select or enter a song");
  });

  it("allows unvoting a song", async () => {
    renderWithRouterAndAuth();
    await screen.findByText("Rock Festival");
    unvoteForSong.mockResolvedValueOnce({});
    const unvoteButtons = await screen.findAllByRole("button", { name: /unvote/i });
    fireEvent.click(unvoteButtons[0]);
    await waitFor(() => {
      expect(unvoteForSong).toHaveBeenCalledWith("1", "Song A", mockToken);
    });
  });
});
