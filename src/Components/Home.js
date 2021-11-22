import { useEffect } from 'react';
import { useSelector } from "react-redux";

const Home = () => {
  // auth state from redux store
  const authState = useSelector((state) => state);

  useEffect(() => {
    console.log(authState);
    // eslint-disable-next-line
  },[]);
  return ( 
    <>
      <div className="text-warning m-4">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum incidunt ut error, hic odio, praesentium iste cupiditate molestiae accusantium pariatur repudiandae placeat vero, officia assumenda aspernatur commodi dicta mollitia possimus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum suscipit quia nemo obcaecati quae consequuntur minima neque aut, soluta, debitis enim est laboriosam iusto! Molestias ipsam vitae optio quis odit.
        </p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint ducimus placeat facilis ipsum sunt dignissimos officiis quibusdam impedit, quaerat voluptas in nostrum iure vitae praesentium nemo nam qui deleniti reiciendis.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, sequi, suscipit culpa non architecto ex cum ipsam enim quod vitae possimus dolore earum dolores laudantium eum adipisci repellat a asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis maiores nobis minima itaque laudantium, quaerat, possimus placeat expedita, at accusantium rem quibusdam ducimus explicabo tempore a? Sint consequuntur totam ad.</p>
      </div>
    </> 
  );
}
 
export default Home;