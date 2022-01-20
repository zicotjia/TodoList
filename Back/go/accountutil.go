package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func accbyname(name string) ([]acc, error) {
	// An albums slice to hold data from returned rows.
	var accounts []acc

	rows, err := db.Query("SELECT * FROM users WHERE username = $1", name)
	if err != nil {
		return nil, fmt.Errorf("accbyname %q: %v", name, err)
	}
	defer rows.Close()

	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var acc acc
		if err := rows.Scan(&acc.Username, &acc.Password, &acc.Id); err != nil {
			return nil, fmt.Errorf("accbyname %q: %v", name, err)
		}
		accounts = append(accounts, acc)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("moviebyid %q: %v", name, err)
	}
	return accounts, nil
}

func allAccount() ([]acc, error) {
	var accounts []acc

	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		return nil, fmt.Errorf("allAccount: %v", err)
	}
	defer rows.Close()

	// Loop through rows, using Scan to assign column data to struct fields.
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

func addaccount(c *gin.Context) {
	var account acc
	c.BindJSON(&account)
	fmt.Println(account)
	_, err := db.Exec("INSERT INTO users values ($1, $2, $3)", account.Username, account.Password, account.Id)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(account)
	fmt.Println(account.Id)
	fmt.Println("updated account db")
	return
}

func allCategories() ([]categ, error) {
	var categories []categ

	rows, err := db.Query("SELECT * FROM categories")
	fmt.Println(rows)
	if err != nil {
		return nil, fmt.Errorf("allAccount: %v", err)
	}
	defer rows.Close()

	// Loop through rows, using Scan to assign column data to struct fields.
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
