package service

type LoginService interface {
	LoginUser(email string, password string) bool
}
type loginInformation struct {
	Username string
	Password string
}

func StaticLoginService() LoginService {
	return &loginInformation{
		Username: "Zico",
		Password: "testing",
	}
}
func (info *loginInformation) LoginUser(username string, password string) bool {
	return info.Username == username && info.Password == password
}
