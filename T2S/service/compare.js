const compareString = (str, str2) => {
    str = str.toUpperCase()
    str2 = str2.toUpperCase()
    var strsplit = str.split(/[^A-Za-z]/)
    var elemFind = 0
    
    strsplit.forEach(element => {
        if (str2.search(element) != -1 && element != "") {
            elemFind++
        }
    })
    
    var result = Math.round(100*(elemFind / strsplit.length*20))/100
    
    return (result.toString() + '/20')
}

export { compareString }