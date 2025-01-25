package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

// ScoreEntry represents a player's score
type ScoreEntry struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
	Time  int    `json:"time"`  // Format "MM:SS"
	Rank  int    `json:"rank"`  // Rank
	Imem  string `json:"timem"` //exported fileds onlt with cap at the start
}

var scores []ScoreEntry

const scoresFile = "scores.json"

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func rankScores() {
	// Implement Bubble Sort to sort by score in descending order
	n := len(scores)
	for i := 0; i <= n; i++ {
		for j := 0; j < n-i-1; j++ {
			if scores[j].Score < scores[j+1].Score { // Compare adjacent scores
				// Swap if the current score is less than the next
				scores[j], scores[j+1] = scores[j+1], scores[j]
			}
		}
	}

	// Assign ranks, with special handling for ties (equal scores)
currentRank := 1
for i := 0; i < n; i++ {

    if i > 0 && scores[i].Score == scores[i-1].Score {
        // Same score as the previous entry, so assign the same rank
        scores[i].Rank = scores[i-1].Rank
    } else {
        // Assign a new rank
        scores[i].Rank = currentRank
    }
    
    currentRank++ // Increment the rank for the next player
}
}

// Function to load scores from the JSON file
func loadScores() error {
	file, err := ioutil.ReadFile(scoresFile)
	if err != nil {
		if os.IsNotExist(err) {
			// If the file doesn't exist, return nil
			return nil
		}
		return err
	}

	return json.Unmarshal(file, &scores) // Decode JSON data into the scores slice
}

// Function to save scores to the JSON file
func saveScores() error {
	data, err := json.Marshal(scores)
	if err != nil {
		return err
	}

	return ioutil.WriteFile(scoresFile, data, 0644) // Write JSON data to the file
}

func counttime() {
	for i := range scores {
		minutes := scores[i].Time / 60                              // Get the minutes
		seconds := scores[i].Time % 60                              // Get the remaining seconds
		scores[i].Imem = fmt.Sprintf("%02d:%02d", minutes, seconds) // Format as "MM:SS"

	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "GET" {
		//rankScores()
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(scores); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

	}

	if r.Method == "POST" {
		var entry ScoreEntry
		err := json.NewDecoder(r.Body).Decode(&entry)
		if err != nil {
			log.Println("Error decoding JSON:", err)
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}
		scores = append(scores, entry)
		rankScores()
		counttime()
		if err := saveScores(); err != nil {
			http.Error(w, "Failed to save scores", http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusCreated)
	}
}

func main() {
	if err := loadScores(); err != nil {
		log.Fatalf("Failed to load scores: %v", err)
	}
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
