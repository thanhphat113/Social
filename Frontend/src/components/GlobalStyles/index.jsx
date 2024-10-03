import "./GlobalStyles.scss";

import Tooltip from "@mui/material/Tooltip"
import { styled } from '@mui/material/styles';

// Tạo một lớp styled cho tooltip
export const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ tooltip: className }} arrow/>
))(({ theme }) => ({
    fontSize: '1.5rem', // Kích thước chữ lớn hơn
    padding: '0.5rem 1.5rem', // Khoảng cách bên trong
    backgroundColor: '#333', // Màu nền
    color: 'white', // Màu chữ
    borderRadius: '0.8rem', // Bo góc
}));

function GlobalStyles({ children }) {
    return children;
}

export default GlobalStyles;
