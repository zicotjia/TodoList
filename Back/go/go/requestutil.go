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

func getAllTask(c *gin.Context) {
	tasks, _ := allTask()
	c.IndentedJSON(http.StatusOK, tasks)
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

func getTaskbyId(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		// handle error
		fmt.Println(err)
		os.Exit(2)
	}
	tasks, _ := allTask()

	for _, a := range tasks {
		if a.Id == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}

func addtask(c *gin.Context) {
	var task tsk
	fmt.Println("hello")
	c.BindJSON(&task)
	fmt.Println(&task)
	_, err := db.Exec("INSERT INTO task values ($1, $2, $3, Default, $4, $5, $6)",
		task.Title, task.Description, task.Category, task.Date, task.Time, task.UserId)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("updated tasks db")
	return
}

func deleteTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		// handle error
		fmt.Println(err)
		os.Exit(2)
	}
	_, err2 := db.Query("DELETE FROM task WHERE id = $1", id)
	if err2 != nil {
		fmt.Println(err2)
	}
	fmt.Println("deleted task")

}

func updateTaskbyid(c *gin.Context) {
	var edit tsk
	fmt.Println("Hello")
	c.BindJSON(&edit)
	fmt.Println(&edit)
	fmt.Println(edit.Date)

	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		fmt.Println(err)
		os.Exit(2)
	}
	_, err2 := db.Exec("UPDATE task SET (title, description, category, date, time) = ($1, $2, $3, $4, $5) WHERE id = $6",
		edit.Title, edit.Description, edit.Category, edit.Date, edit.Time, id)
	if err2 != nil {
		fmt.Println(err2)
	}
	fmt.Println("edited task")
}

func getAllCategories(c *gin.Context) {
	fmt.Println("hello")
	categories, _ := allCategories()
	c.IndentedJSON(http.StatusOK, categories)
}

func addCat(c *gin.Context) {
	var category categ
	c.BindJSON(&category)
	fmt.Println(&category)

	_, err := db.Query("INSERT INTO categories values ($1)", category.Category)
	if err != nil {
		fmt.Println(err)
	}
}

func deleteCat(c *gin.Context) {
	categ := c.Param("name")
	fmt.Println("Hello")

	_, err := db.Query("DELETE FROM categories WHERE category = $1", categ)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("deleted category")

}

//&{test3 Use Detergent Chores 11 2/22/2222 01:31}
