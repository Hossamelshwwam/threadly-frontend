import Cookies from "js-cookie";

const useLogout = () => {
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    window.location.reload();
  };

  return { logout };
};

export default useLogout;
