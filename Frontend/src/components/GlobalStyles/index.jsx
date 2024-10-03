import "./GlobalStyles.scss";

import Tooltip from "@mui/material/Tooltip"
import { styled } from '@mui/material/styles';

// Tạo một lớp styled cho tooltip
export const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ tooltip: className }} arrow/>
))(({ theme }) => ({
    fontSize: '15px', // Kích thước chữ lớn hơn
    padding: '5px 15px', // Khoảng cách bên trong
    backgroundColor: '#333', // Màu nền
    color: 'white', // Màu chữ
    borderRadius: '8px', // Bo góc
}));

function GlobalStyles({ children }) {
    return children;
}

export default GlobalStyles;
