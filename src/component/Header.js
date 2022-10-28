import React from "react";


const Header = () => {
    return(
        
            <div class="d-flex align-items-center">
                    {/* <p class="m-0 px-3" style="font-weight: bold; color: #5F6368;">
                        <%= user.name %>
                    </p> */}
                    <a class="icon" href="#">
                        <span class="material-icons-outlined">
                            help_outline
                        </span>
                    </a>
                    <a class="icon" href="#">
                        <span class="material-icons-outlined">
                            info
                        </span>
                    </a>
                    <a class="icon" href="C:\Users\piyawan\Desktop\proj_V4\image\S__4399107.jpg">
                        <span class="material-icons-outlined">
                            settings
                        </span>
                    </a>
                    <a class="icon" href="/logout">
                        <span class="material-icons-outlined">
                            logout
                        </span>
                    </a>
            </div>
         
    )
}
export default Header;
