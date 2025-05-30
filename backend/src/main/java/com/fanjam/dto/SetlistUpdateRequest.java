package com.fanjam.dto;

import java.util.List;

public class SetlistUpdateRequest {
    private List<String> setlist;
    private int customSongSlots;

    public List<String> getSetlist() { return setlist; }
    public int getCustomSongSlots() { return customSongSlots; }
    public void setSetlist(List<String> setlist) { this.setlist = setlist; }
    public void setCustomSongSlots(int customSongSlots) { this.customSongSlots = customSongSlots; }
}