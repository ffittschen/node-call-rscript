sumFunc <- function(num1,num2){
  sum(num1, num2)
}

args <- commandArgs(trailingOnly = TRUE)

json <- fromJSON(args)

output <- sumFunc(as.numeric(json$a),as.numeric(json$b))

print(toJSON(output));
