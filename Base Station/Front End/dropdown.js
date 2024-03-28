window.onload = function() {
    document.getElementById('itemSelection').addEventListener('change', function() {
        // Hide all selection areas first
        document.getElementById('customSelectionArea').style.display = 'none';
    
        // Show the selected area
        const selectedValue = this.value;
        if (selectedValue === 'All') {
            document.getElementById('CycleAnalystSelectionArea').style.display = 'none';
            document.getElementById('TempaturesSelectionArea').style.display = 'none';
            document.getElementById('IMUSelectionArea').style.display = 'none';
            document.getElementById('customSelectionArea').style.display = 'none';

            document.getElementById('submitSelectionArea').style.display = 'block';
        } else if (selectedValue === 'CycleAnalyst') {
            document.getElementById('CycleAnalystSelectionArea').style.display = 'block';
            document.getElementById('TempaturesSelectionArea').style.display = 'none';
            document.getElementById('IMUSelectionArea').style.display = 'none';
            document.getElementById('customSelectionArea').style.display = 'none';

            document.getElementById('submitSelectionArea').style.display = 'block';
        } else if (selectedValue === 'Tempatures') {
            document.getElementById('TempaturesSelectionArea').style.display = 'block';
            document.getElementById('CycleAnalystSelectionArea').style.display = 'none';
            document.getElementById('IMUSelectionArea').style.display = 'none';
            document.getElementById('customSelectionArea').style.display = 'none';

            document.getElementById('submitSelectionArea').style.display = 'block';
        } else if (selectedValue === 'IMU') {
            document.getElementById('IMUSelectionArea').style.display = 'block';
            document.getElementById('CycleAnalystSelectionArea').style.display = 'none';
            document.getElementById('TempaturesSelectionArea').style.display = 'none';
            document.getElementById('customSelectionArea').style.display = 'none';

            document.getElementById('submitSelectionArea').style.display = 'block';
        } else if (selectedValue === 'Custom') {
            document.getElementById('customSelectionArea').style.display = 'block';
            document.getElementById('CycleAnalystSelectionArea').style.display = 'block';
            document.getElementById('TempaturesSelectionArea').style.display = 'block';
            document.getElementById('IMUSelectionArea').style.display = 'block';

            document.getElementById('submitSelectionArea').style.display = 'block';
        } 
    });
};