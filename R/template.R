# json library
library('jsonlite')

# wrap all calls in one function to capture output
# this could also be done by calling an external script instead of a function within this one
function_to_call <- function(dataIn) {
  sumFunc <- function (num1, num2){
    sum(num1, num2)
  }

  # call function
  ret <- sumFunc(as.numeric(dataIn$a),as.numeric(dataIn$b))

  # output JSON
  print(toJSON(output))
}

run <- function(dataIn) {
  # Parse commandline arguments from dataIn
  json <- NULL
  if (length(dataIn) > 0) {
    json <- fromJSON(dataIn)
  }

  # run script, capture output
  captured <- tryCatch(capture.output({
    temp <- cluster_sessions(json)
  }), error = function(err) err)

  # process and return
  if (inherits(captured, "error")) {
    msg <- conditionMessage(captured)
    cat("Error in R script\n", sQuote(msg), file = stderr())
    return(invisible(F))
  }
  out <- if (is.null(temp)) {
    ""
  } else {
    temp
  }
  toJSON(out)
}

suppressWarnings(
  run(commandArgs(trailingOnly = TRUE))
)