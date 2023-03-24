const Video = (props) => {
    const click = props.click;

    return (
        <div id="video">
            <iframe
                id="pickachu"
                title="pokemon"
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/548337f8-c739-46d6-8ed3-7e1d6a3325aa/dbhmpfq-f21376fa-8fc6-442e-8944-b35b34a38d92.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU0ODMzN2Y4LWM3MzktNDZkNi04ZWQzLTdlMWQ2YTMzMjVhYVwvZGJobXBmcS1mMjEzNzZmYS04ZmM2LTQ0MmUtODk0NC1iMzViMzRhMzhkOTIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bn4m9ta5KuJj70R8AWyDjQpW3BsQRG13hZclayuCQ8M"
                key="video"
                width="450"
                height="560"
                frameborder='0'
                allow='autoplay; encrypted-media'
            ></iframe>
            <button id="startGame" onClick={click}>Start game</button>
        </div>
    )
}
export default Video