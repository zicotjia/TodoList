package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"main/src/config"
	"net/http"
	"os"
	"strconv"
)

type acc struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Id       int    `json:"id"`
}

type tsk struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Id          int    `json:"id"`
	Date        string `json:"date"`
	Time        string `json:"time"`
	UserId      int    `json:"userid""`
}

type categ struct {
	Category string `json:"Category"`
}

func GetAllAccounts(c *gin.Context) {
	accs, _ := allAccount()
	c.IndentedJSON(http.StatusOK, accs)
}

func GetAllTask(c *gin.Context) {
	tasks, _ := AllTask()
	c.IndentedJSON(http.StatusOK, tasks)
}

func GetAccountbyId(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		// handle error
		fmt.Println(err)
		os.Exit(2)
	}
	accs, _ := allAccount()

	//loop through all account until desired account is found
	for _, a := range accs {
		if a.Id == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "account not found"})
}

func GetTaskbyId(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		// handle error
		fmt.Println(err)
		os.Exit(2)
	}
	tasks, _ := AllTask()

	//loop through all task until desired task is found
	for _, a := range tasks {
		if a.Id == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "task not found"})
}

func Addtask(c *gin.Context) {
	var task tsk
	c.BindJSON(&task)

	_, err := config.DB.Exec("INSERT INTO task values ($1, $2, $3, Default, $4, $5, $6)",
		task.Title, task.Description, task.Category, task.Date, task.Time, task.UserId)
	if err != nil {
		fmt.Println(err)
	}

	return
}

func DeleteTask(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		// handle error
		fmt.Println(err)
		os.Exit(2)
	}

	_, err2 := config.DB.Query("DELETE FROM task WHERE id = $1", id)
	if err2 != nil {
		fmt.Println(err2)
	}

}

func UpdateTaskbyid(c *gin.Context) {
	var edit tsk
	c.BindJSON(&edit)

	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		fmt.Println(err)
		os.Exit(2)
	}

	_, err2 := config.DB.Exec("UPDATE task SET (title, description, category, date, time) = ($1, $2, $3, $4, $5) WHERE id = $6",
		edit.Title, edit.Description, edit.Category, edit.Date, edit.Time, id)

	if err2 != nil {
		fmt.Println(err2)
	}

}

func GetAllCategories(c *gin.Context) {
	categories, _ := allCategories()
	c.IndentedJSON(http.StatusOK, categories)
}

func AddCat(c *gin.Context) {
	var category categ
	c.BindJSON(&category)
	fmt.Println(&category)

	_, err := config.DB.Query("INSERT INTO category values ($1)", category.Category)
	if err != nil {
		fmt.Println(err)
	}
}

func DeleteCat(c *gin.Context) {
	categ := c.Param("name")

	_, err := config.DB.Query("DELETE FROM category WHERE category = $1", categ)
	if err != nil {
		fmt.Println(err)
	}

}

