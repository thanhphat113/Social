import clsx from "clsx";
import styles from './PostedPhotos.module.scss'
import PropTypes from 'prop-types';
import Image from "../Image";
function PostedPhotos({data}) {
    return ( 
        <>
        <div className={clsx(styles.sideBarWrapper)}>
            <h1>Ảnh</h1>
            <p style={{color:'#cfcece', paddingLeft: '5px'}}>{data.totalPhotos} ảnh</p>
            <div className={clsx(styles.photoWrapper)}>
                {data.photos.map((item, index) => (
                    <div key={index} className={clsx(styles.photo)}>
                        <Image shape="square" size={'100%'} src={item.photo} />
                    </div>
                ))}
            </div> 
            <h2>Xem tất cả</h2>        
        </div>
    </>
     );
}
PostedPhotos.propTypes = {
    data: PropTypes.shape({
        totalPhotos: PropTypes.number.isRequired,   
        photos: PropTypes.arrayOf(                 
            PropTypes.shape({
                photo: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired
};

export default PostedPhotos;