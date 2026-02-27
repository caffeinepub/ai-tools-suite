import Time "mo:core/Time";
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

actor {
  type ToolType = Text; // e.g., "chat", "img", "script"
  type HistoryEntry = {
    toolType : ToolType;
    input : Text;
    output : Text;
    timestamp : Time.Time;
  };

  let history = Map.empty<Text, List.List<HistoryEntry>>();
  let usageStats = Map.empty<ToolType, Nat>();

  // Save a new history entry
  public shared ({ caller }) func saveHistory(toolType : ToolType, input : Text, output : Text) : async () {
    let entry : HistoryEntry = {
      toolType;
      input;
      output;
      timestamp = Time.now();
    };

    // Add to history
    let userHistory = switch (history.get(toolType)) {
      case (null) { List.empty<HistoryEntry>() };
      case (?existing) { existing };
    };
    userHistory.add(entry);
    history.add(toolType, userHistory);

    // Update usage count
    let currentCount = switch (usageStats.get(toolType)) {
      case (null) { 0 };
      case (?count) { count };
    };
    usageStats.add(toolType, currentCount + 1);
  };

  // Get recent history for a specific tool (last 20 entries)
  public query ({ caller }) func getRecentToolHistory(toolType : ToolType) : async [HistoryEntry] {
    switch (history.get(toolType)) {
      case (null) { [] };
      case (?entries) {
        entries.toArray().sort(
          func(a, b) { Int.compare(b.timestamp, a.timestamp) }
        ).sliceToArray(0, 20);
      };
    };
  };

  // Get all recent history across all tools (last 50 entries)
  public query ({ caller }) func getAllRecentHistory() : async [HistoryEntry] {
    let allEntries = List.empty<HistoryEntry>();

    for ((tool, entries) in history.entries()) {
      entries.forEach(func(entry) { allEntries.add(entry) });
    };

    allEntries.toArray().sort(
      func(a, b) { Int.compare(b.timestamp, a.timestamp) }
    ).sliceToArray(0, 50);
  };

  // Clear history for a specific tool
  public shared ({ caller }) func clearToolHistory(toolType : ToolType) : async () {
    if (not history.containsKey(toolType)) {
      Runtime.trap("History for this tool already clear.");
    };
    history.remove(toolType);
  };

  // Get usage statistics for all tools
  public query ({ caller }) func getUsageStats() : async [(ToolType, Nat)] {
    usageStats.toArray();
  };
};
