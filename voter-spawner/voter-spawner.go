package main

import (
	"fmt"
	"flag"
	"time"
	"bytes"
	"strconv"
	"net/http"
	"math/rand/v2"
	"encoding/json"
)

func choose() string {
	choice := rand.IntN(100) + 1

	if choice >= 50 {
		return "faustao"
	} else {
		return "silvio"
	}
}

func fakeIp() string {
	part1 := strconv.Itoa(rand.IntN(1000))
	part2 := strconv.Itoa(rand.IntN(1000))
	part3 := strconv.Itoa(rand.IntN(1000))
	part4 := strconv.Itoa(rand.IntN(1000))

	return part1+"."+part2+"."+part3+"."+part4
}

func postVote(voterIp string) {
	choiceId := choose()
	fmt.Println("Voter from ip:", voterIp, "voted:", choiceId)
	vote := map[string]string { "choice_id": choiceId, "voter_ip": voterIp }
	jsonVote, _ := json.Marshal(vote)
	res, _ := http.Post("http://localhost:4000/vote", "application/json", bytes.NewBuffer(jsonVote))
	defer res.Body.Close()
}

func spawn(i int) {
	voterIp := fakeIp()
	fmt.Println("Voter", i, "spawned with ip", voterIp)

	for {
		postVote(voterIp)
		t := time.Duration(rand.IntN(10) + 1)
		time.Sleep(t * time.Second)
	}
}

func main() {
	fmt.Println("Release the voters...")

	voters := flag.Int("voters", 1, "amount of voters")
	flag.Parse()

	for i := range *voters {
		go spawn(i+1)
	}

	time.Sleep(1 * time.Hour)
}
