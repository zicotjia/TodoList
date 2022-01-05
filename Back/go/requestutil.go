package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"strconv"
)

func getAllAccounts(c *gin.Context) {
	accs, _ := allAccount()
	c.IndentedJSON(http.StatusOK, accs)
}

func getAccountbyId(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		// handle error
		fmt.Println(err)
		os.Exit(2)
	}
	accs, _ := allAccount()

	for _, a := range accs {
		if a.Id == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}
