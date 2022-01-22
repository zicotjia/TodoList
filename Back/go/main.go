package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"log"
	"main/src/config"
	"main/src/middleware"
	"os"
)

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

func main() {
	var err error

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}
	fmt.Println("Hello")

	config.DB, err = sql.Open("postgres", os.Getenv("DATABASE_URL"))

	if err != nil {
		panic(err)
	}
	//defer db.Close()

	fmt.Println("successfully connected")

	//accs, err := accbyname("zico")
	//if err != nil {
	//	log.Fatal(err)
	//}
	//fmt.Printf("acc found: %v\n", accs)
	//

	tasks, err := middleware.AllTask()
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

	r.GET("/acc", middleware.GetAllAccounts)
	r.GET("/acc/:id", middleware.GetAccountbyId)
	r.POST("/entry", middleware.Addaccount)
	r.GET("/task", middleware.GetAllTask)
	r.GET("/task/:id", middleware.GetTaskbyId)
	r.POST("/task/entry", middleware.Addtask)
	r.DELETE("/task/delete/:id", middleware.DeleteTask)
	r.PATCH("/task/entry/:id", middleware.UpdateTaskbyid)
	r.GET("/categories", middleware.GetAllCategories)
	r.POST("/categories/entry", middleware.AddCat)
	r.DELETE("/categories/delete/:name", middleware.DeleteCat)
	//r.GET("/path/:name/:age", PathParameters)
	//r.OPTIONS("/", PostHomePage)
	//r.GET("/movies", getMovie)

	r.Run(":" + port)
}
