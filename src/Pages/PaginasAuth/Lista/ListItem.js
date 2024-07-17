import styledComponents from "styled-components";
import ReactAudioPlayer from 'react-audio-player';

const ItemContainer = styledComponents.div`
    border-radius: 4px;
    background-color: #fff;
    height: 150px;
    width: 350px;
    color: #29303b;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 10px;
`;

const Thumbnail = styledComponents.img`
    border-radius:10px;
    width: auto;
    height: 100%;
    border: 0;
    vertical-align: middle;
    float: left;
    margin-right: 10px;
`;

const TitlePane = styledComponents.div`
    font-weight: 700;
    margin-bottom: 5px;
`;

const CantorPane = styledComponents.div`
    margin-bottom: 5px;
    color:black;
`;

const Item = styledComponents.div`
    text-decoration: none;
`;

function ListItem(props) {
    return (
        <Item>
            <ItemContainer>
                <Thumbnail src="https://yt3.ggpht.com/j6Vfqm3apIVLjbVO49o8LA0kPOluPkZiAgYWQo11CTCJSuqrRB7R_PS7ZlwgA6X9Cp9A8xM4gw=s900-c-k-c0x00ffffff-no-rj" />
                <TitlePane>{props.nome}</TitlePane>
                <div className="audio">
                <ReactAudioPlayer
                 src={props.arquivo}
                 controls
                 autoplay
                 />
                 </div>
                <CantorPane>{props.cantor}</CantorPane>
            </ItemContainer>
        </Item>
    );
  }
  
  export default ListItem;