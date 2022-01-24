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

func main() {
	var err error

	port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}
	fmt.Println("Hello")

	//connect to DB
	config.DB, err = sql.Open("postgres", os.Getenv("DATABASE_URL"))

	if err != nil {
		panic(err)
	}
	//defer db.Close()

	fmt.Println("successfully connected")

	r := gin.Default()
	r.Use(cors.Default())

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

	r.Run(":" + port)
}
