package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"main/src/config"
	"net/http"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func allAccount() ([]acc, error) {
	var accounts []acc

	rows, err := config.DB.Query("SELECT * FROM users")
	if err != nil {
		return nil, fmt.Errorf("allAccount: %v", err)
	}
	defer rows.Close()

	// Loop through rows, using Scan to assign column data to acc to be returned
	for rows.Next() {
		var acc acc
		if err := rows.Scan(&acc.Username, &acc.Password, &acc.Id); err != nil {
			return nil, fmt.Errorf("allAccount : %v", err)
		}
		accounts = append(accounts, acc)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("allAccount : %v", err)
	}
	return accounts, nil
}

func Addaccount(c *gin.Context) {
	var account acc
	c.BindJSON(&account)

	//insert into db
	_, err := config.DB.Exec("INSERT INTO users values ($1, $2, $3)", account.Username, account.Password, account.Id)
	if err != nil {
		fmt.Println(err)
	}
	return
}

func allCategories() ([]categ, error) {
	var categories []categ

	rows, err := config.DB.Query("SELECT * FROM category")
	fmt.Println(rows)
	if err != nil {
		return nil, fmt.Errorf("allAccount: %v", err)
	}
	defer rows.Close()

	// Loop through rows, using Scan to assign column data categ to be returned
	for rows.Next() {
		var category categ
		if err := rows.Scan(&category.Category); err != nil {
			return nil, fmt.Errorf("allAccount : %v", err)
		}
		categories = append(categories, category)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("allAccount : %v", err)
	}
	return categories, nil
}
