package middleware

import (
	"fmt"
	"main/src/config"
)

func AllTask() ([]tsk, error) {
	var tasks []tsk

	rows, err := config.DB.Query("SELECT * FROM task")
	if err != nil {
		return nil, fmt.Errorf("getallTask: %v", err)
	}
	defer rows.Close()

	// Loop through rows, using Scan to assign column data to struct fields.
	for rows.Next() {
		var task tsk
		if err := rows.Scan(&task.Title, &task.Description, &task.Category, &task.Id, &task.Date, &task.Time, &task.UserId); err != nil {
			return nil, fmt.Errorf("getallTask : %v", err)
		}
		tasks = append(tasks, task)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("getallTask : %v", err)
	}
	return tasks, nil
}
