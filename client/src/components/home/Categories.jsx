
import { Button, Table, TableBody, TableCell, TableHead, TableRow,styled } from "@mui/material"

import { categories } from "../../constants/data"

import { Link , useSearchParams } from "react-router-dom";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    text-transform: none;
    background-color: #3f51b5;
    color: white;
    text-decoration: none;
    height: 50px;
    border-radius: 4px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;


const Categories = () => {

    const [searchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category');

    return (
      <>
        <StyledLink to={`/create?category=${selectedCategory || ""}`}>
          <StyledButton variant="contained">CREATE BLOG</StyledButton>
        </StyledLink>

        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                  color: selectedCategory ? "black" : "blue",
                  textAlign: "center",
                }}>
                <StyledLink to="/">All Categories</StyledLink>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    color: selectedCategory === category.type ? "blue" : "black",
                    textAlign: "center",
                  }}>
                  <StyledLink to={`/?category=${category.type}`}>
                    {category.type}
                  </StyledLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </>
    );

}

export default Categories
