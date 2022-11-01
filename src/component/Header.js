import React from "react";


const Header = () => {
    return(
        <div>
            <div class="d-flex align-items-center"> {/*Header */}
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
            <div class="row g-3">{/* menu join = index.ejs*/}
                <div class="col-md-6">
                    <h1 class="mb-3">
                        Premium video meetings. Now free for everyone.
                    </h1>
                    <p>We re-engineered the service we built for secure business meetings, Google Meet,
                         to make it free and
                        available for all.</p>
                    <div class="a123 my-5">
                        <a class="btn btn-primary new-meeting" href="/new-meeting" role="button">New
                            Meeting</a>
                        <form action="join-room" method="POST">
                            <div class="input-group ">
                                <span class="input-group-text" id="inputGroup-sizing-default">
                                    <ion-icon name="planet-outline"></ion-icon>
                                </span>
                                <input name="room_id" type="text" class="form-control" placeholder="Enter a code or Link"
                                    aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                <button class="btn btn-outline-primary" type="submit" id="button-addon2">Join</button>
                            </div>
                        </form>
                    </div>
                    {/* <hr> */}
                    <p><a href="#">Learn more about</a> S Meet</p>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <img src="/images/ss.png" width="100%" class="rounded" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Header;
