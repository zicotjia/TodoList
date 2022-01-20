package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"log"
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
	Category string `json:Category`
}

//func HomePage(c *gin.Context) {
//	c.JSON(200, gin.H{
//		"message": "Hello World",
//	})
//}
//

//func PostHomePage(c *gin.Context) {
//	body := c.Request.Body
//	value, err := ioutil.ReadAll(body)
//	if err != nil {
//		fmt.Println(err.Error())
//	}
//	c.JSON(200, gin.H{
//		"message": string(value),
//	})
//}

var db *sql.DB

func main() {
	var err error

	fmt.Println("Hello")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		"localhost", 5432, "postgres", "1945TONYzhu!!!", "postgres")

	db, err = sql.Open("postgres", psqlInfo)

	if err != nil {
		panic(err)
	}
	//defer db.Close()

	pingErr := db.Ping()
	if pingErr != nil {
		panic(pingErr)
	}

	fmt.Println("successfully connected")

	//accs, err := accbyname("zico")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Printf("acc found: %v\n", accs)
	//

	tasks, err := allTask()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("all accs: %v\n", tasks)

	//newacc, err := addaccount(acc{
	//	Username: "Jo",
	//	Password: 1111,
	//	id:       3,
	//})
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Printf("ID of added album: %v\n", newacc)

	r := gin.Default()
	r.Use(cors.Default())

	//config := cors.DefaultConfig()
	//config.AllowOrigins = []string{"http://google.com", "http://localhost:3000"}

	r.GET("/acc", getAllAccounts)
	r.GET("/acc/:id", getAccountbyId)
	r.POST("/entry", addaccount)
	r.GET("/task", getAllTask)
	r.GET("/task/:id", getTaskbyId)
	r.POST("/task/entry", addtask)
	r.DELETE("/task/delete/:id", deleteTask)
	r.PATCH("/task/entry/:id", updateTaskbyid)
	r.GET("/categories", getAllCategories)
	r.POST("/categories/entry", addCat)
	r.DELETE("/categories/delete/:name", deleteCat)
	//r.GET("/path/:name/:age", PathParameters)
	//r.OPTIONS("/", PostHomePage)
	//r.GET("/movies", getMovie)

	r.Run("localhost:8080")
}
